import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const itemsmenu: MenuItem[] = [
  {
    label: "Thời sự",
    key: "1",
  },
  {
    label: "Góc nhìn",
    key: "2",
  },
  {
    label: "Thế giới",
    key: "3",
    children: [
      {
        label: "Option 4",
        key: "children1",
      },
      {
        label: "Item 2",
        key: "children2",
      },
    ],
  },
  {
    key: "4",
    label: "Kinh doanh",
  },
  {
    key: "5",
    label: "Start up",
  },
  {
    key: "6",
    label: "Giải trí",
  },
  {
    key: "7",
    label: "Thể thao",
  },
  {
    key: "8",
    label: "Tin mới nhất",
  },
  {
    key: "9",
    label: "Tin nổi bật",
  },
  {
    key: "10",
    label: "Tin xem nhiều",
  },
  {
    key: "11",
    label: "Du lịch",
  },

  {
    key: "12",
    label: "Đời sống",
  },
  {
    key: "13",
    label: "Khoa học",
  },
  {
    key: "14",
    label: "Giáo dục",
  },
  {
    key: "15",
    label: "Tâm sự",
  },
];
