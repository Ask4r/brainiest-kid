import { useCreateSession } from "@/api/session/hooks";
import { useNavigate } from "react-router";
import { Button } from "@/ui/components/base/buttons/button";
import { FileUpload } from "@/ui/components/application/file-upload/file-upload-base";
import { useState } from "react";
import { ArrowLeft } from "@untitledui/icons";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  fileObject: File;
};

function uploadFile(_file: File, onProgress: (progress: number) => void) {
  // let progress = 0;
  // const interval = setInterval(() => {
  //   progress++;
  //   onProgress(progress);
  //   if (progress === 100) {
  //     clearInterval(interval);
  //   }
  // }, 100);
  onProgress(100);
}


export default function CreatePage() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | undefined>(undefined);

  const { mutate: createSession } = useCreateSession();

  const handleDropFiles = (files: FileList) => {
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

    uploadFile(file, (progress) => {
      setUploadedFile((prev) => (prev === undefined ? undefined : { ...prev, progress }));
    });
  };

  const handleDeleteFile = () => {
    setUploadedFile(undefined);
  };

  const handleRetryFile = () => {
    if (uploadedFile === undefined) {
      return;
    }

    uploadFile(new File([], uploadFile.name, { type: uploadedFile.type }), (progress) => {
      setUploadedFile((prev) => (prev === undefined ? prev : { ...prev, progress, failed: false }));
    });
  };

  const handleCreateClick = async () => {
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
    <main className="section-container my-24 gap-6 flex flex-col">
      <Button size="md" color="link-gray" iconLeading={ArrowLeft} href="/">Вернуться</Button>

      <FileUpload.Root>
        <FileUpload.DropZone hint="JSON с вопросами для игры" onDropFiles={handleDropFiles} allowsMultiple={false} />

        <FileUpload.List>
          {uploadedFile !== undefined && (
            <FileUpload.ListItemProgressBar
              key={uploadedFile.id}
              {...uploadedFile}
              size={uploadedFile.size}
              onDelete={() => handleDeleteFile()}
              onRetry={() => handleRetryFile()}
            />
          )}
        </FileUpload.List>
      </FileUpload.Root>

      <Button size="lg" onClick={handleCreateClick} isDisabled={uploadedFile === undefined}>Создать</Button>
    </main>
  );
}
