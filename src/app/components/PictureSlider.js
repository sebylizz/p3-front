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
          height: '500px', // Ensures both sections have the same height
        }}
      >
        {/* Left Section: Image with "Leghetto" Text */}
        <div
          style={{
            flex: 2, // Allocates more space to the image section
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Image */}
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
  
        {/* Right Section: Orange Block */}
        <div
          className="flex flex-col items-center justify-center bg-orange-500 p-8 rounded-lg shadow-md"
          style={{
            flex: 1.5, // Allocates less space to the orange block
            height: '100%', // Matches the height of the left image
            display: 'flex', // Ensures content is centered
            alignItems: 'center', // Horizontal centering
            justifyContent: 'center', // Vertical centering
          }}
        >
          <h2
            className="text-6xl font-bold text-black text-center"
            style={{
                fontFamily: 'Newsreader, serif',
                marginBottom: '1.5rem', // Adds spacing between the text and button
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
  