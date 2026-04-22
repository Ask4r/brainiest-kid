import { useState } from "react";
import { Button } from "@/ui/components/base/buttons/button";
import { Input, InputBase } from "@/ui/components/base/input/input";
import { useJoinSession } from "@/api/session/hooks";
import { useNavigate } from "react-router";
import { ArrowLeft, Check, Copy01, Key02, User02 } from "@untitledui/icons";
import { InputGroup } from "@/ui/components/base/input/input-group";

function validateCode(value: string) {
  if (value.length > 6) {
    return "Код должен состоять только из 6 цифр.";
  }
  if (Number.isNaN(parseInt(value))) {
    return "Код должен состоять только из цифр.";
  }
  return undefined;
}

function validateUsername(value: string) {
  if (value.length < 3) {
    return "Имя должно состоять хотя бы из 3 символов.";
  }
  return undefined;
}

export default function JoinPage() {
  const navigate = useNavigate();

  const [sessionCode, setSessionCode] = useState<number | undefined>(undefined);
  const [sessionCodeError, setSessionCodeError] = useState<string | undefined>(undefined);
  const [pasted, setPasted] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | undefined>(undefined);

  const [apiError, setApiError] = useState<unknown | undefined>(undefined);

  const { mutate: joinSession } = useJoinSession();

  const isValid = () => {
    return sessionCode !== undefined &&
      username !== "" &&
      sessionCodeError === undefined &&
      usernameError === undefined;
  };

  const handleCodeInput = (value: string) => {
    const error = validateCode(value);
    if (error !== undefined) {
      setSessionCodeError(error);
      return;
    }
    setSessionCode(parseInt(value));
    setSessionCodeError(undefined);
  };

  const handlePasteClick = () => {
    navigator.clipboard?.readText()
      .then((copied) => {
        console.log("Copied text", copied);
        const error = validateCode(copied);
        if (error !== undefined) {
          setSessionCodeError(error);
          return;
        }
        setSessionCode(parseInt(copied));
        setPasted(true);
        setSessionCodeError(undefined);
      });
  };

  const handleUsernameInput = (value: string) => {
    const error = validateUsername(value);
    if (error !== undefined) {
      setUsernameError(error);
      return;
    }
    setUsername(value);
    setUsernameError(undefined);
  };

  const handleSubmit = () => {
    if (sessionCode === undefined) {
      return;
    }
    joinSession({ sessionCode: sessionCode, name: username }, {
      onSuccess() {
        navigate("/lobby");
      },
      onError(error) {
        setApiError(error);
      }
    });
  };

  return (
    <main className="section-container my-24 flex flex-col gap-6">
      <Button size="md" color="link-gray" iconLeading={ArrowLeft} href="/">Вернуться</Button>

      <InputGroup
        label="Ключ подключения"
        hint={sessionCodeError !== undefined ? sessionCodeError : "Узнайте ключ подключения у создавшего."}
        value={Number.isNaN(sessionCode) ? "" : sessionCode?.toString()}
        maxLength={6}
        isInvalid={sessionCodeError !== undefined}
        onChange={handleCodeInput}
        trailingAddon={
          <Button color="secondary" iconLeading={pasted ? Check : Copy01} onClick={handlePasteClick}>
            {pasted ? "" : "Вставить"}
          </Button>
        }>
        <InputBase icon={Key02} placeholder="000000" />
      </InputGroup>

      <Input
        label="Идентификатор"
        hint={usernameError !== undefined ? usernameError : "Ваше имя, отображаемое при игре."}
        icon={User02}
        isInvalid={usernameError !== undefined}
        placeholder="Любое имя"
        onChange={handleUsernameInput}
      />

      <Button size="lg" isDisabled={!isValid()} onClick={handleSubmit}>Продолжить</Button>

      <div className="text-error-primary">
        {JSON.stringify(apiError)}
      </div>
    </main >
  );
}
