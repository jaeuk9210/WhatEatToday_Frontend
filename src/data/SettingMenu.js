import route from "../routes";

const SettingMenu = {
  menuGroups: [
    {
      title: "계정",
      menus: [
        {
          title: "비밀번호 변경",
          link: "",
        },
        {
          title: "로그아웃",
          link: route.logout,
        },
      ],
    },
    {
      title: "어플 설정",
      menus: [
        {
          title: "알림 설정",
          link: "",
        },
        {
          title: "언어",
          link: "",
        },
      ],
    },
    {
      title: "활동",
      menus: [
        {
          title: "내 맛집 리스트",
          link: "",
        },
        {
          title: "밥친 리스트",
          link: "",
        },
        {
          title: "타임라인",
          link: "",
        },
      ],
    },
    {
      title: "이용안내",
      menus: [
        {
          title: "앱 버전",
          link: "",
        },
        {
          title: "문의하기",
          link: "",
        },
        {
          title: "공지사항",
          link: "",
        },
        {
          title: "서비스 이용약관",
          link: "",
        },
        {
          title: "개인정보 처리방침",
          link: "",
        },
      ],
    },
  ],
};

export default SettingMenu;
