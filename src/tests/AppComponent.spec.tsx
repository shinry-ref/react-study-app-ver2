import App from "../App";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

describe("App Component", () => {
  it("ローディング画面が表示されること", async () => {
    // `loading`状態を`true`に設定してAppコンポーネントをレンダリング
    render(<App/>);
    
    // `Spinner`が表示されるのを待つ
    const spinner = await screen.findByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  // 他のテストケースもここに追加できます
});