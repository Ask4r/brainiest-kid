import { useCreateSession } from "@/api/session/hooks";
import { useNavigate } from "react-router";
import { Button } from "@/ui/components/base/buttons/button";
import { useState } from "react";
import { ArrowLeft } from "@untitledui/icons";
import { InputFile } from "@/ui/components/base/input/input-file";
import { Form } from "@/ui/components/base/form/form";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  fileObject: File;
};

export default function CreatePage() {
  const navigate = useNavigate();

  const [uploadedFile, setUploadedFile] = useState<UploadedFile | undefined>(undefined);

  const { mutate: createSession } = useCreateSession();

  const handleFileChange = (files: FileList | null) => {
    if (files === null) {
      setUploadedFile(undefined);
      return;
    }
    const file = files[0];
    const newFileWithId = {
      id: Math.random().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      fileObject: file,
    };
    setUploadedFile(newFileWithId);
  };

  const handleSubmit = async () => {
    if (uploadedFile === undefined) {
      return;
    }

    const gameData = await uploadedFile.fileObject.text();

    // Welp...
    createSession(JSON.stringify(JSON.parse(gameData)), {
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
        <InputFile label="JSON с вопросами для игры" placeholder="Не выбран" buttonText="Файл" onChange={handleFileChange} />

        <Button size="lg" type="submit" isDisabled={uploadedFile === undefined}>Создать</Button>
      </Form>
    </main>
  );
}
