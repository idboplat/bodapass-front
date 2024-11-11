import * as lib from "../../../../utils/getPage";

describe("페이지 정보 가져오기", () => {
  const PATH_LIST: lib.Path[] = [
    // {
    //   category: "운영",
    //   pages: [],
    // },
    {
      category: "사용자",
      pages: [
        { title: "고객 관리", number: "400201", Component: () => null },
        { title: "관리자 관리", number: "400202", Component: () => null },
      ],
    },
    // {
    //   category: "로그",
    //   pages: [],
    // },
    {
      category: "주문",
      pages: [
        { title: "미체결 내역", number: "400401", Component: () => null },
        { title: "주문 내역", number: "400402", Component: () => null },
        { title: "체결 내역", number: "400403", Component: () => null },
        { title: "고객 손익 내역", number: "400404", Component: () => null },
      ],
    },
    {
      category: "입출금",
      pages: [
        {
          category: "입금",
          pages: [
            {
              title: "회사 입금 신청 내역",
              number: "400502",
              Component: () => null,
            },
            {
              title: "고객 입출금 신청 내역",
              number: "400503",
              Component: () => null,
            },
          ],
        },
      ],
    },
    // {
    //   category: "현황",
    //   pages: [],
    // },
  ];

  test("모든 페이지 번호를 가져온다", () => {
    expect(lib.getAllPageNm(PATH_LIST)).toEqual([
      "400201",
      "400202",
      "400401",
      "400402",
      "400403",
      "400404",
      "400502",
      "400503",
    ]);
  });

  test("특정 번호의 페이지 번호를 가져온다.", () => {
    expect(lib.getPage(PATH_LIST, "400401")).toEqual(PATH_LIST[1].pages[0]);
    expect(lib.getPage(PATH_LIST, "400502")).toEqual(
      (PATH_LIST[2].pages as lib.Path[])[0].pages[0],
    );
  });

  test("component가 삭제된 pathList를 가져온다.", () => {
    expect(lib.getClientPathList(PATH_LIST)).toEqual([
      {
        category: "사용자",
        pages: [
          { title: "고객 관리", number: "400201" },
          { title: "관리자 관리", number: "400202" },
        ],
      },
      {
        category: "주문",
        pages: [
          { title: "미체결 내역", number: "400401" },
          { title: "주문 내역", number: "400402" },
          { title: "체결 내역", number: "400403" },
          { title: "고객 손익 내역", number: "400404" },
        ],
      },
      {
        category: "입출금",
        pages: [
          {
            category: "입금",
            pages: [
              {
                title: "회사 입금 신청 내역",
                number: "400502",
              },
              {
                title: "고객 입출금 신청 내역",
                number: "400503",
              },
            ],
          },
        ],
      },
    ]);
  });
});
