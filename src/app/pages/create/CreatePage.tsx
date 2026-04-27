import { useCreateSession } from "@/api/session/hooks";
import { useNavigate } from "react-router";
import { Button } from "@/ui/components/base/buttons/button";
import { useState } from "react";
import { ArrowLeft, File05 } from "@untitledui/icons";
import { InputFile } from "@/ui/components/base/input/input-file";
import { Form } from "@/ui/components/base/form/form";
import { GameDataSchema } from "@/state/game-data/schemas";
import { z, type ZodError } from "zod";
import type { GameDataState } from "@/state/game-data/models";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  fileObject: File;
};

function getErrorString(error: ZodError<z.infer<typeof GameDataSchema>>) {
  const issue = error.issues[0];
  console.log(error.issues);
  switch (issue.code) {
    case "invalid_type":
      return `Формат поля "${issue.path.join(" > ")}" неправильный или оно отсутствует.`;
    case "unrecognized_keys":
      return `Файл содержит неизвестный параметр "${issue.keys[0]}".`;
    case "too_big":
      return `Поле "${issue.path.join(" > ")}" содержит лишие элементы. Максимум: ${issue.maximum}.`;
    case "too_small":
      return `Поле "${issue.path.join(" > ")}" содержит недостаточно элементов. Минимум: ${issue.minimum}.`;
  }
  return "Содержимое файла не конфигурация игры.";
}

export default function CreatePage() {
  const navigate = useNavigate();

  const [uploadedFile, setUploadedFile] = useState<UploadedFile | undefined>(undefined);
  const [validatedGameData, setValidatedGameData] = useState<GameDataState | undefined>(undefined);
  const [fileError, setFileError] = useState<string | undefined>(undefined);

  const { mutate: createSession } = useCreateSession();

  const validateFile = async (file: UploadedFile) => {
    if (file === undefined) {
      setFileError(undefined);
      setValidatedGameData(undefined);
      return;
    }

    if (file.size >= 1_000_000) {
      setFileError("Файл слишком большой (больше 1МБ).");
      setValidatedGameData(undefined);
      return;
    }

    const gameData = await file.fileObject.text();
    let gameDataObj;
    try {
      gameDataObj = JSON.parse(gameData);
    } catch {
      setFileError("Содержимое файла не соответствует JSON.");
      setValidatedGameData(undefined);
      return;
    }
    const { success, error, data } = GameDataSchema.safeParse(gameDataObj);

    if (!success) {
      const errorString = getErrorString(error);
      setFileError(errorString);
      setValidatedGameData(undefined);
      return;
    }

    setFileError(undefined);
    setValidatedGameData(data);
  };

  const handleFileChange = (files: FileList | null) => {
    if (files === null) {
      setUploadedFile(undefined);
      return;
    }
    const fileRaw = files[0];
    const file = {
      id: Math.random().toString(),
      name: fileRaw.name,
      size: fileRaw.size,
      type: fileRaw.type,
      progress: 0,
      fileObject: fileRaw,
    };
    setUploadedFile(file);
    validateFile(file);
  };

  const handleSubmit = async () => {
    if (uploadedFile === undefined
      || fileError !== undefined
      || validatedGameData === undefined) {
      return;
    }

    createSession(JSON.stringify(validatedGameData), {
      onSuccess() {
        navigate("/lobby");
      },
      onError(error) {
        console.error("error", error);
      },
    });
  };

  return (
    <main className="section-container my-24 max-w-lg gap-6 flex flex-col">
      <div>
        <Button size="md" color="link-gray" iconLeading={ArrowLeft} href="..">Вернуться</Button>
      </div>

      <Form className="flex flex-col gap-6" action={handleSubmit}>
        <InputFile
          isInvalid={fileError !== undefined}
          label="JSON с вопросами для игры"
          placeholder="Не выбран"
          hint={fileError !== undefined && fileError}
          buttonText="Файл"
          onChange={handleFileChange}
        />

        <Button color="link-gray" href="/game.json" download="СамыйУмный.json" iconLeading={File05}>Пример файла с конфигурацией</Button>

        <Button size="lg" type="submit" isDisabled={uploadedFile === undefined && fileError === undefined}>Создать</Button>
      </Form>
    </main>
  );
}
