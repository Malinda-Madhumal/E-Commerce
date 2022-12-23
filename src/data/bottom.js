const screens = {
  home: "Home",
  search: "Search",
  profile: "Profile",
};

const bottom_tabs = [
  {
    id: 0,
    name: screens.home,
    icon: require("../assets/home.png"),
  },
  {
    id: 1,
    name: screens.search,
    icon: require("../assets/search.png.png"),
  },
  {
    id: 2,
    name: screens.profile,
    icon: require("../assets/profile.png"),
  },
];

export default {
  screens,
  bottom_tabs,
};
