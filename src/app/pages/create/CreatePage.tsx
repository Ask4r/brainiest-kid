import { Button } from "@/ui/components/base/buttons/button";
import { useCreateSession } from "@/api/session/hooks";
import { useNavigate } from "react-router";


export default function CreatePage() {
  const navigate = useNavigate();

  const { mutate: createSession } = useCreateSession();

  const onClick = () => {
    createSession(undefined, {
      onSuccess() {
        navigate("/lobby");
      },
      onError(error) {
        console.error("error", error);
      },
    });
  };

  return (
    <main className="section-container my-24 flex flex-col">
      <span className="text-tertiary">Здесь будет ввод файла</span>
      <Button onClick={onClick}>Create</Button>
    </main>
  );
}
