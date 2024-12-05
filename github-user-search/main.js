const API_ENDPOINT = "https://api.github.com/users/";

// Load the Octocat profile on initial page load then load user input data following a search
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");

  searchButton.addEventListener("click", () => {
    const username = searchBar.value.trim();
    if (username) fetchUsers(username);
  });

  searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const username = searchBar.value.trim();
      if (username) fetchUsers(username);
    }
  });

  async function fetchUsers(username) {
    try {
      const response = await fetch(`${API_ENDPOINT}${username}`);
      if (!response.ok) {
        throw new Error("Profile not found");
      }
      const data = await response.json();
      updateProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Optionally display an error message on the UI
      const searchInput = document.querySelector(".search-input");
      searchInput.classList.add("error");
      searchInput.value = "No results";
      setTimeout(() => {
        searchInput.value = "";
      }, 2000);
    }
  }

  function updateProfile(data) {
    // Update the profile image
    const profileImage = document.querySelector(".profile-image");
    profileImage.src = data.avatar_url;

    // Update the profile information
    document.querySelector(".name").textContent =
      data.name || "Name not available";
    document.querySelector(".login").textContent = `@${data.login}`;
    document.querySelector(".date-joined").textContent = new Date(
      data.created_at
    ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Update the profile summary
    document.querySelector(".profile-bio").textContent =
      data.bio || "Not Available";

    // Update the profile stats
    document.querySelector(".repositories-value").textContent =
      data.public_repos;
    document.querySelector(".followers-value").textContent = data.followers;
    document.querySelector(".following-value").textContent = data.following;

    // Update the profile socials
    document.querySelector(".location-name").textContent =
      data.location || "Location not specified";
    const websiteLink = document.querySelector(".website-link");
    if (data.html_url) {
      websiteLink.href = data.html_url;
      websiteLink.textContent = data.html_url;
    } else {
      websiteLink.href = "#";
      websiteLink.textContent = "Not Available";
    }

    document.querySelector(".twitter-name").textContent =
      data.twitter_username || "Not Available";
    document.querySelector(".company-name").textContent =
      data.company || "Not Available";
  }

  fetchUsers("octocat");
});
