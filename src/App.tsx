import { Button, Center, Flex, Heading, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import './App.css'
import { useEffect, useState } from 'react';
import { Record } from './domain/record';
import { deleteStudyRecord, getAllStudyRecords } from './utils/supabaseFunction';
import { SubmitModal } from './organisms/modal/SubmitModal';

function App() {
  const [records, setRecords] = useState<Record[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // useEffect(() => {
  //   setRecords([
  //     new Record("1", "学習1", "3"),
  //     new Record("2", "学習2", "3"),
  //     new Record("3", "学習3", "3"),
  //   ]);
  // }, []);

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

  return (
    <>
      { loading ? (
      <Center h="100vh">
        <Spinner data-testid="spinner" />
      </Center>
      ) : (
      <Flex direction="column" alignItems="center" p={4}>
        <Heading mb={4} data-testid="title">学習記録アプリ</Heading>
        <Button colorScheme='teal' onClick={onOpen} data-testid="new-button">新規登録</Button>
        <SubmitModal isOpen={isOpen} onClose={onClose} setRecords={setRecords} />
        <TableContainer>
          <Table variant="simple" data-testid="table">
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>タイトル</Th>
                <Th>時間</Th>
                <Th>作成日時</Th>
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