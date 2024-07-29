import React from 'react';

function Profile({ profileDetails, logout }) {
  return (
    <div className="top-0 right-0 mt-4 mr-4">
      {profileDetails && profileDetails.name ? (
        <div className="flex bg-green-100 rounded-lg shadow-lg p-2">
          <img src={profileDetails.picture} alt="" className="w-10 h-10 rounded-full mr-2" />
          <div>
            <h3 className="text-lg font-semibold">Hi 👋, {profileDetails.name}</h3>
            <h4 className="text-sm font-italic">{profileDetails.email}</h4>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
