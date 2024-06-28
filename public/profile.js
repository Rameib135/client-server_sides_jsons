function loadProfileData() {
    var profile = document.getElementById('profile-select').value;
    fetch(`/data/${profile}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debugging line to check the data being returned

            // Update banner and profile image
            document.getElementById('banner-section').style.backgroundImage = `url('/${profile}/banner.png')`;
            document.getElementById('profile-img').src = `/${profile}/profile.png`;

            // Update info image
            document.getElementById('info-img').src = `/${profile}/image1.png`;

            // Update bio section
            document.getElementById('bio-title').innerText = profile.charAt(0).toUpperCase() + profile.slice(1);
            document.getElementById('bio-content').innerHTML = data.bio.replace(/\n/g, '<br>');

            // Update endorsements section
            let endorsementsHTML = '';
            data.endorsements.forEach((endorsement, index) => {
                endorsementsHTML += `<div class="quote">
                                        <div class="white-box">
                                            <p>${endorsement}</p>
                                            <hr />
                                            <span>Author ${index + 1}</span>
                                        </div>
                                     </div>`;
            });
            document.getElementById('endorsements').innerHTML = endorsementsHTML;

            // Update endorsement image
            document.getElementById('endorsement-img').src = `/${profile}/image2.png`;

            // Update friends section
            let friendsHTML = '';
            data.friends.forEach(friend => {
                friendsHTML += `<a href="/profile/?id=${friend.id}">
                                    <img src='/${friend.id}/profile.png' alt="${friend.name}">
                                </a>`;
            });
            document.getElementById('friends').innerHTML = friendsHTML;
        })
        .catch(error => {
            console.error('Failed to fetch data:', error);
            alert('Failed to load profile data.');
        });
}

document.addEventListener("DOMContentLoaded", function() {
    loadProfileData();  // Load data for the initially selected profile
});
