import { FC, memo, useEffect, useState } from "react";
import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { addStudyRecord, getAllStudyRecords, updateStudyRecord } from "../../utils/supabaseFunction";
import { Record } from "../../domain/record";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  record: Record | null;
  setRecords: (records: Record[]) => void;
  modal: string;
}

type FormData = {
  title: string;
  time: number;
};

export const SubmitModal:FC<Props> = memo((props) => {
  const { isOpen, onClose, record, setRecords, modal } = props;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<number>(0);

  // const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  // const onChangeTime = (event:  React.ChangeEvent<HTMLInputElement>) => setTime(event.target.value);

  const onSubmit = async (modal: string) => {
    // if (detail == "" || time == 0) return setErrorFlag(true);

    if( modal == 'new'){
      await addStudyRecord(title, time);
    }else if (record) {
      await updateStudyRecord(record.id, title, time);
    } else {
      console.error("Record is null. Cannot update the study record.");
      return;
    }
    const newRecords = await getAllStudyRecords();
    setRecords(newRecords);

    reset();
    // setTitle('');
    // setTime(0);
    onClose();
  };

  useEffect(() => {
    if (record) {
      reset({
        title: record.title,
        time: record.time,
      });
    }
  }, [reset, record]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
    <ModalOverlay />
    <ModalContent pb={2}>
      <ModalHeader data-testid="new-title">{ modal == 'new' ? '新規登録' : '記録編集' }</ModalHeader>
      <ModalCloseButton />
      <ModalBody mx={4}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>学習記録</FormLabel>
            <Input 
              defaultValue={title}
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
            defaultValue={time}
            type="number"
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
          <Button type={"submit"} colorScheme='teal' onClick={handleSubmit(() => onSubmit(modal))} data-testid="submit">{ modal == 'new' ? '登録' : '保存' }</Button>
          <Button onClick={onClose}>キャンセル</Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
})