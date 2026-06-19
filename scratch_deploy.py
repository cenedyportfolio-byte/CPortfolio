import paramiko
import sys
import time

def run_command(client, command):
    print(f"Running: {command}")
    stdin, stdout, stderr = client.exec_command(command)
    exit_status = stdout.channel.recv_exit_status()
    out = stdout.read().decode('utf-8')
    err = stderr.read().decode('utf-8')
    if out:
        print(out)
    if err:
        print(err, file=sys.stderr)
    return exit_status, out

try:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print("Connecting to 192.168.0.121...")
    client.connect('192.168.0.121', username='root', password='123654', timeout=10)
    print("Connected.")
    
    # Run docker ps to see what's running
    status, ps_out = run_command(client, 'docker ps --format "{{.Names}} {{.Image}}"')
    
    container_name = None
    for line in ps_out.strip().split('\n'):
        if 'cportfolio' in line.lower() or 'portfolio' in line.lower():
            container_name = line.split()[0]
            print(f"Found portfolio container: {container_name}")
            break
            
    if not container_name:
        print("Could not automatically find the portfolio container. Here are all running containers:")
        print(ps_out)
        sys.exit(1)
        
    print("Pulling latest image...")
    # Just in case we use docker-compose, we can check for docker-compose.yml
    status, ls_out = run_command(client, 'ls -la | grep docker-compose')
    if "docker-compose" in ls_out:
        print("Found docker-compose, using that instead...")
        run_command(client, 'docker-compose pull')
        run_command(client, 'docker-compose up -d')
    else:
        # We need to recreate it using standard commands
        # Wait, if we don't know the full run command, it's safer to ask docker to restart it if we use watchtower, but watchtower might be easier?
        # Actually, if they are using ghcr.io image, let's pull it
        run_command(client, f'docker pull ghcr.io/cenedyportfolio-byte/cportfolio:latest')
        # We can't easily recreate a container with all its original arguments if it's run via raw docker run.
        # But there is a tool called runlike or we can just try to see how it was run.
        # Often it's better to just run a script if it exists.
        run_command(client, 'history | grep "docker run" | tail -n 5')
        
    client.close()
except Exception as e:
    print(f"Error: {e}")
