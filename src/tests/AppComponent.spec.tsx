import App from "../App";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

// 例: Jestを使ったモック
jest.mock('./utils/supabaseFunction', () => ({
  getAllStudyRecords: jest.fn(),
  deleteStudyRecord: jest.fn(),
}));


describe("title", () => {
  it("ローディング画面が表示されること", async () => {
    render(<App />);
    const spinner = await screen.findByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  // it("should render title", () => {
  //   render(<App />);
  //   expect(screen.getByText("Hello World")).toBeInTheDocument();
  // });
});