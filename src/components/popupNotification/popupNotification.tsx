import React, {Component} from "react";
import Modal from "react-responsive-modal";
import {IEmpty} from "../../common/IEmpty";
import {EventNames, eventRegister} from "../../common/eventRegister";

import "./styles.scss";

interface IState extends INotificationPopupData {
  isOpen: boolean;
}

export interface INotificationPopupData {
  title: string;
  subtitle: string;
  iconType: "none" | "error" | "warning" | "success";
}

export class PopupNotification extends Component<IEmpty, IState> {
  protected listenerId: string;

  constructor(props: IEmpty) {
    super(props);
    this.state = {
      isOpen: false,
      subtitle: "",
      title: "",
      iconType: "none",
    };
    this.listenerId = "";
  }

  componentDidMount(): void {
    this.listenerId = eventRegister.addEventListener(EventNames.notification, (data: INotificationPopupData): void => {
      this.setState({...data, isOpen: true});
    });
  }

  componentWillUnmount(): void {
    eventRegister.removeEventListener(this.listenerId);
  }

  render(): JSX.Element | null {
    const {title, subtitle, iconType} = this.state;
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <Modal
        animationDuration={150}
        showCloseIcon={false}
        open={this.state.isOpen}
        onClose={this.onClose}
        center={true}
      >
        <div className={"popup"}>
          <div className={"popup__icon"}>
            <div className={`popup__icon-${iconType}`} />
          </div>
          <div className={"popup__title"}>{title}</div>
          <div className={"popup__subtitle"}>{subtitle}</div>
          <div className={"popup__buttons"}>
            <button onClick={this.onClose}>{"ОК"}</button>
          </div>
        </div>
      </Modal>
    );
  }

  private onClose = (): void => {
    this.setState({isOpen: false});
  };
}
