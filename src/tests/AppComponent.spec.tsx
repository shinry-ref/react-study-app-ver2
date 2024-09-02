import App from "../App";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

describe("loading", () => {
  it("ローディング画面が表示されること", async () => {
    render(<App/>);
    
    const spinner = await screen.findByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});

describe("table", () => {
  it("テーブルをみることができる(リスト)", async () => {
    render(<App/>);
    
    const table = await screen.findByTestId("table");
    expect(table).toBeInTheDocument();
  });
});

describe("new record", () => {
  it("新規登録ボタンがある", async () => {
    render(<App/>);
    
    const table = await screen.findByTestId("new-button");
    expect(table).toBeInTheDocument();
    expect(table).toHaveTextContent('新規登録');
  });
});

describe("new record", () => {
  it("新規登録ボタンがある", async () => {
    render(<App/>);
    
    const table = await screen.findByTestId("new-button");
    expect(table).toBeInTheDocument();
    expect(table).toHaveTextContent('新規登録');
  });
});