const API_ENDPOINT = "https://api.github.com/users/";
// const darkModeToggle = document.querySelector(".toggle");
// const toggleMode = document.querySelector(".toggle-mode");
// const toggleIcon = docment.querySelector("toggle-icon");

// darkModeToggle.addEventListener("click", () => {
//   toggleMode.innerHTML = "LIGHT";
// });

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
        searchInput.classList.remove("error");
        searchInput.value = "";
      }, 2000);
    }
  }

  function updateProfile(data) {
    // Update the profile image
    const profileImage = document.querySelector(".profile-image");
    profileImage.src = data.avatar_url;

    // Update the profile information
    document.querySelector(".name").textContent = data.name || data.login;
    document.querySelector(".login").textContent = `@${data.login}`;
    document.querySelector(".date-joined").textContent = `Joined ${new Date(
      data.created_at
    ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;

    // Update the profile summary
    updateElement(".profile-bio", data.bio, "This profile has no bio");

    // Update the profile stats
    updateElement(".repositories-value", data.public_repos);
    updateElement(".followers-value", data.followers || "0");
    updateElement(".following-value", data.following || "0");

    // Update the profile socials
    updateElement(".location-name", data.location, "Not Available");
    updateLink(".website-link", data.blog, "Not Available");
    updateLink(".twitter-name", data.twitter_username, "Not Available", true);
    updateLink(".company-name", data.company, "Not Available");
  }

  // Helper function to update text content and add a class if data is missing
  function updateElement(selector, value, defaultValue) {
    const element = document.querySelector(selector);
    element.textContent = value || defaultValue;
    if (!value) {
      element.classList.add("not-available");
    }
  }

  // Helper function to update link elements
  function updateLink(selector, value, defaultValue, isTwitter = false) {
    const element = document.querySelector(selector);
    if (value) {
      element.textContent = value;
      element.href = isTwitter ? `https://twitter.com/${value}` : value;
    } else {
      element.textContent = defaultValue;
      element.href = "#";
      element.classList.add("not-available");
    }
  }

  fetchUsers("octocat");
});
