import App from "../App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { addStudyRecord, deleteStudyRecord, getAllStudyRecords } from "../utils/supabaseFunction";

jest.mock('../utils/supabaseFunction', () => ({
  getAllStudyRecords: jest.fn(),
  addStudyRecord: jest.fn(),
  deleteStudyRecord: jest.fn(),
}));

describe("loading", () => {
  it("ローディング画面が表示されること", async () => {
    render(<App/>);
    
    await waitFor(() => {
      const spinner = screen.getByTestId("spinner");
      expect(spinner).toBeInTheDocument();
    });
  });
});

describe("table", () => {
  it("テーブルをみることができる(リスト)", async () => {
    render(<App/>);
    
    const table = await screen.findByTestId("table");
    expect(table).toBeInTheDocument();
  });
});

describe("new button", () => {
  it("新規登録ボタンがある", async () => {
    render(<App/>);
    
    const table = await screen.findByTestId("new-button");
    expect(table).toBeInTheDocument();
    expect(table).toHaveTextContent('新規登録');
  });
});

describe("title", () => {
  it("タイトルがあること", async () => {
    render(<App/>);

    const title = await screen.findByTestId("title");
    expect(title).toHaveTextContent('学習記録');
  });
});

describe("new record", () => {
  it("登録できること", async () => {
    (getAllStudyRecords as jest.Mock).mockResolvedValue([{ title: 'Test Title', time: '10' }]);
    render(<App/>);

    const button = await screen.findByTestId("new-button");
    fireEvent.click(button);

    fireEvent.change(screen.getByLabelText('学習記録'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('学習時間'), { target: { value: '10' } });

    fireEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(addStudyRecord).toHaveBeenCalledWith('Test Title', '10');
      expect(getAllStudyRecords).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });
});

describe("new modal title", () => {
  it("モーダルタイトルがあること", async () => {
    render(<App/>);

    const button = await screen.findByTestId("new-button");
    fireEvent.click(button);

    const table = await screen.findByTestId("new-title");
    expect(table).toHaveTextContent('新規登録');
  });
});

describe("modal valid", () => {
  it("学習内容がないときに登録するとエラーがでる", async () => {
    render(<App/>);

    const button = await screen.findByTestId("new-button");
    fireEvent.click(button);

    fireEvent.click(screen.getByTestId('submit'));

    expect(await screen.findByText('内容の入力は必須です')).toBeInTheDocument();
  });

  it("学習時間がないときに登録するとエラーがでる", async () => {
    render(<App/>);

    const button = await screen.findByTestId("new-button");
    fireEvent.click(button);

    fireEvent.click(screen.getByTestId('submit'));

    expect(await screen.findByText('時間の入力は必須です')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('学習時間'), { target: { value: '-1' } });
    fireEvent.click(screen.getByTestId('submit'));

    expect(await screen.findByText('時間は0以上である必要があります')).toBeInTheDocument();
  });
});

describe("delete", () => {
  it("削除ができること", async () => {
    (getAllStudyRecords as jest.Mock).mockResolvedValue([{ id: 1, title: 'Test Title', time: '10', created_at: '2024-09-01' }]);

    render(<App/>);

    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    const deleteButton = await screen.findByTestId("delete");
    fireEvent.click(deleteButton);

    (getAllStudyRecords as jest.Mock).mockResolvedValueOnce([]);
    await waitFor(() => {
      expect(deleteStudyRecord).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(getAllStudyRecords).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });
  });
});