"use client";
import { useRouter } from 'next/navigation';
export default function PictureSlider() {
    const router = useRouter();
    return (
      <div
        className="flex items-stretch"
        style={{
          marginLeft: '10%',
          marginRight: '10%',
          height: '500px',
        }}
      >
        
        <div
          style={{
            flex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src="/homePagePictures/homePagePicture.png"
            alt="Leghetto Basketball"
            className="h-full object-cover"
            style={{
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
  
        <div
          className="flex flex-col items-center justify-center bg-orange-500 p-8 rounded-lg shadow-md"
          style={{
            flex: 1.5, 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
          }}
        >
          <h2
            className="text-6xl font-bold text-black text-center"
            style={{
                fontFamily: 'Newsreader, serif',
                marginBottom: '1.5rem', 
            }}
          >
            Changing the Culture of Basketball
          </h2>
          <button
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
          style={{
              fontSize: '1.2rem',
            }}
            onClick={() => router.push('/browseProducts')}
          >
            Browse our products
          </button>
        </div>
      </div>
    );
  }
  