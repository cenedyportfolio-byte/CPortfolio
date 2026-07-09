import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Cenedy Udoy Palma - Senior Backend Developer & AI Engineer';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #000000, #111111)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontSize: 72, fontWeight: 900, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Cenedy <span style={{ color: '#E11D48', marginLeft: 10 }}>Udoy Palma</span>
          </h1>
          <p style={{ fontSize: 36, color: '#A1A1AA', textAlign: 'center', maxWidth: 900 }}>
            Senior Backend Developer & AI Engineer
          </p>
          <div style={{ display: 'flex', marginTop: 40, gap: '20px' }}>
            <span style={{ fontSize: 24, padding: '10px 20px', border: '2px solid #333', borderRadius: '50px' }}>Laravel</span>
            <span style={{ fontSize: 24, padding: '10px 20px', border: '2px solid #333', borderRadius: '50px' }}>Node.js</span>
            <span style={{ fontSize: 24, padding: '10px 20px', border: '2px solid #333', borderRadius: '50px' }}>Python</span>
            <span style={{ fontSize: 24, padding: '10px 20px', border: '2px solid #333', borderRadius: '50px' }}>AI</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
