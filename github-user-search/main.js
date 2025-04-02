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
      searchInput.style.textAlign = "right";
      setTimeout(() => {
        searchInput.style.textAlign = "left";
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

document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");
  const toggle = document.querySelector(".toggle");
  const toggleMode = document.querySelector(".toggle-mode");
  const toggleIcon = document.querySelector(".toggle-icon");

  // Function to update UI based on current theme
  const updateTheme = () => {
    const isDark = document.body.classList.contains("dark-mode");
    logo.src = isDark
      ? "./assets/icon-logo-white.svg"
      : "./assets/icon-logo-black.svg";
    toggleMode.textContent = isDark ? "LIGHT" : "DARK";
    toggleIcon.src = isDark
      ? "./assets/icon-sun.svg"
      : "./assets/icon-moon.svg";
    toggleIcon.alt = isDark ? "Toggle light mode" : "Toggle dark mode";
    document
      .querySelectorAll(
        ".location-icon, .website-icon, .twitter-icon, .company-icon"
      )
      .forEach((icon) => {
        icon.style.filter = isDark ? "brightness(0) invert(1)" : "none";
      });
  };

  // Apply system preference on page load
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
  }

  updateTheme();

  // Event listener for toggling mode
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    updateTheme();
  });
});
