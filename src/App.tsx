import { Box, Button, Center, Flex, Heading, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Wrap } from '@chakra-ui/react'
import './App.css'
import { useEffect, useState } from 'react';
import { Record } from './domain/record';
import { getAllStudyRecords } from './utils/supabaseFunction';
import { SubmitModal } from './organisms/modal/SubmitModal';

function App() {
  const [records, setRecords] = useState<Record[]>();
  const [loading, setLoading] = useState<boolean>(false);
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
      const newRecords = await getAllStudyRecords();
      console.log(newRecords);
      setRecords(newRecords);
      setLoading(false);
    }
    getAllRecords();
  }, []);

  return (
    <>
      { loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
      ) : (
      <Flex direction="column" alignItems="center" p={4}>
        <Heading mb={4}>学習記録アプリ</Heading>
        <Button colorScheme='teal' onClick={onOpen}>登録</Button>
        <SubmitModal isOpen={isOpen} onClose={onClose} />
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>タイトル</Th>
                <Th isNumeric>時間</Th>
              </Tr>
            </Thead>
            <Tbody>
              {records?.map((record) => (
                <Tr key={record.id}>
                  <Td>{record.id}</Td>
                  <Td>{record.title}</Td>
                  <Td isNumeric>{record.time}</Td>
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