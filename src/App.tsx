import { Button, Center, Flex, Heading, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import './App.css'
import { useEffect, useState } from 'react';
import { Record } from './domain/record';
import { deleteStudyRecord, getAllStudyRecords } from './utils/supabaseFunction';
import { SubmitModal } from './organisms/modal/SubmitModal';

function App() {
  const [records, setRecords] = useState<Record[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [modal, setModal] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  // useEffect(() => {
  //   setRecords([
  //     new Record("1", "学習1", "3"),
  //     new Record("2", "学習2", "3"),
  //     new Record("3", "学習3", "3"),
  //   ]);
  // }, []);https://chatgpt.com/c/8d7f15dc-c8f5-4e49-b754-ce5d91d50b91

  useEffect(() => {
    const getAllRecords = async () =>{
      setLoading(true);
      try {
        const newRecords = await getAllStudyRecords();
        setRecords(newRecords);
      } catch (error){
        console.error("Failed to fetch records:", error);
      } finally {
        setLoading(false);
      }
    }
    getAllRecords();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteStudyRecord(id);
      const newRecords = await getAllStudyRecords();
      setRecords(newRecords);
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  }

  const handleCreateOpen = () => {
    setSelectedRecord({id: 0, title: "", time: 0, created_at: ""});
    setModal('new');
    onOpen();
  };

  const handleEditOpen = (record: Record) => {
    setSelectedRecord(record);
    setModal('edit');
    onOpen();
  };

  return (
    <>
      { loading ? (
      <Center h="100vh">
        <Spinner data-testid="spinner" />
      </Center>
      ) : (
      <Flex direction="column" alignItems="center" p={4}>
        <Heading mb={4} data-testid="title">学習記録アプリ</Heading>
        <Button colorScheme='teal' onClick={() => handleCreateOpen()} data-testid="new-button">新規登録</Button>
        <SubmitModal isOpen={isOpen} onClose={onClose} record={selectedRecord} setRecords={setRecords} modal={modal} />
        <TableContainer>
          <Table variant="simple" data-testid="table">
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>タイトル</Th>
                <Th>時間</Th>
                <Th>作成日時</Th>
                <Th>編集</Th>
                <Th>削除</Th>
              </Tr>
            </Thead>
            <Tbody>
              {records?.map((record) => (
                <Tr key={record.id}>
                  <Td>{record.id}</Td>
                  <Td>{record.title}</Td>
                  <Td isNumeric>{record.time}</Td>
                  <Td>{record.created_at}</Td>
                  <Td>
                    <Button colorScheme='blue' onClick={() => handleEditOpen(record)} data-testid="edit">編集</Button>
                  </Td>
                  <Td><Button colorScheme='pink' onClick={() => handleDelete(record.id)} data-testid="delete">削除</Button></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      )}
    </>
  );
}

export default App;