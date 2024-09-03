import { FC, memo, useEffect, useState } from "react";
import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { addStudyRecord, getAllStudyRecords } from "../../utils/supabaseFunction";
import { Record } from "../../domain/record";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  record: Record | null;
  setRecords: (records: Record[]) => void;
}

type FormData = {
  title: string;
  time: string;
};

export const EditModal:FC<Props> = memo((props) => {
  const { isOpen, onClose, record, setRecords } = props;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<string>("");
  console.log(record)

  const onSubmit = async () => {

    await addStudyRecord(title, time);
    const newRecords = await getAllStudyRecords();
    setRecords(newRecords);

    reset();
    setTitle('');
    setTime('');
    onClose();
  }

  useEffect(() => {
    if (record) {
      setTitle(record.title);
      setTime(record.time);
    }
  }, [record]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
    <ModalOverlay />
    <ModalContent pb={2}>
      <ModalHeader data-testid="new-title">編集</ModalHeader>
      <ModalCloseButton />
      <ModalBody mx={4}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>学習記録</FormLabel>
            <Input 
              defaultValue={record ? record.title : ""}
              {...register("title", {
                required: "内容の入力は必須です",
                onChange: (event) => {
                  setTitle(event.target.value) 
                }
              })} />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.time}>
            <FormLabel>学習時間</FormLabel>
            <Input
            type="number"
            defaultValue={record ? record.title : ""}
            {...register("time", {
              required: "時間の入力は必須です",
              onChange: (event) => {
                setTime(event.target.value) 
              },
              min: {
                value: 0,
                message: "時間は0以上である必要があります",
              },
            })} />
            <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup variant='outline' spacing='6'>
          <Button type={"submit"} colorScheme='teal' onClick={handleSubmit(onSubmit)} data-testid="submit">保存</Button>
          <Button onClick={onClose}>キャンセル</Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
})