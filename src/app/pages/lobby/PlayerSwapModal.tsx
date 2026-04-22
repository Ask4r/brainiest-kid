import type { PlayerDataState } from "@/state/game-data/models";
import { Modal, ModalOverlay } from "@/ui/components/application/modals/modal";
import { Button } from "@/ui/components/base/buttons/button";
import { ButtonUtility } from "@/ui/components/base/buttons/button-utility";
import { FeaturedIcon } from "@/ui/components/foundations/featured-icon/featured-icon";
import { Repeat01, X } from "@untitledui/icons";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  disconnectedPlayers: PlayerDataState[];
  onConfirm: (id: string) => void;
  onCancel: () => void;
};

export function PlayerSwapModal(props: Props) {
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);

  const handlePlayerClick = (id: string) => {
    setPlayerId(id);
  };

  const handleModalCloseClick = () => {
    props.onCancel();
  };

  const handleConfirmClick = () => {
    if (playerId !== undefined) {
      props.onConfirm(playerId);
    }
  };

  const handleDiscardClick = () => {
    props.onCancel();
  };

  console.log("modal state", props.isOpen);

  return (
    <ModalOverlay isOpen={props.isOpen}>
      <Modal className="rounded-xl bg-primary h-auto align-middle shadow-xl outline-hidden max-sm:overflow-y-auto sm:rounded-2xl max-h-[calc(var(--visual-viewport-height)-var(--modal-pt)-var(--modal-pb))] sm:max-w-100">
        <section className="relative max-h-[inherit] w-full overflow-y-auto outline-hidden" role="dialog" tabIndex={-1}>
          <ButtonUtility color="tertiary" icon={X} className="absolute top-3 right-3 sm:top-4 sm:right-4" onClick={handleModalCloseClick} />
          <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
            <FeaturedIcon color="gray" theme="modern" icon={Repeat01} />
            <div className="z-10 flex flex-col gap-0.5">
              <h2 className="text-md font-semibold text-primary">
                Впустить вместо игрока
              </h2>
              <p className="text-sm text-tertiary">
                Игрок зайдет вместо отключившегося игрока, получив его прогресс.
                Это единственный способ вернуть отключившегося игрока.
              </p>
              <ul className="max-h-full">
                {props.disconnectedPlayers.map(player => (
                  <li key={player.playerId}>
                    <Button color={playerId === player.playerId ? "link-destructive" : "link-gray"} onClick={() => handlePlayerClick(player.playerId)}>{player.playerName}</Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
            <Button color="primary" size="md" onClick={handleConfirmClick} isDisabled={playerId === undefined}>Подтвердить</Button>
            <Button color="secondary" size="md" onClick={handleDiscardClick}>Отмена</Button>
          </div>
        </section>
      </Modal>
    </ModalOverlay>
  );
}
