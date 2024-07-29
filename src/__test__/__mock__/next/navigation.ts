// __mocks__/next/navagation.js
const useRouter = jest.fn();
const usePathname = jest.fn();

useRouter.mockImplementation(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
}));

export { useRouter, usePathname };
