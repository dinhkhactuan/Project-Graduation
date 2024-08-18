import { MenuProps } from "antd";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

// Tạo một custom hook để trả về danh sách menu items
export function useMenuItems(): MenuItem[] {
  const router = useRouter();

  return [
    {
      label: "Thời sự",
      key: "1",
      onClick: () => {
        router.push("/news");
      },
    },
    {
      label: "Góc nhìn",
      key: "2",
    },
    {
      label: "Thế giới",
      key: "3",
      onClick: () => {
        router.push("/world");
      },
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
      onClick: () => {
        router.push("/business");
      },
    },
    {
      key: "5",
      label: "Start up",
      onClick: () => {
        router.push("/start-up");
      },
    },
    {
      key: "6",
      label: "Giải trí",
      onClick: () => {
        router.push("/entertainment");
      },
    },
    {
      key: "7",
      label: "Thể thao",
      onClick: () => {
        router.push("/sport");
      },
    },
    {
      key: "8",
      label: "Tin mới nhất",
      onClick: () => {
        router.push("/news");
      },
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
      onClick: () => {
        router.push("/toursm");
      },
    },

    {
      key: "12",
      label: "Đời sống",
      onClick: () => {
        router.push("/life");
      },
    },
    {
      key: "13",
      label: "Khoa học",
      onClick: () => {
        router.push("/science");
      },
    },
    {
      key: "14",
      label: "Giáo dục",
      onClick: () => {
        router.push("/education");
      },
    },
    {
      key: "15",
      label: "Tâm sự",
      onClick: () => {
        router.push("/confide");
      },
    },
  ];
}
