import React, {Component} from "react";
import Modal from "react-responsive-modal";
import {IEmpty} from "../../common/IEmpty";
import {EventNames, eventRegister} from "../../common/eventRegister";
// import cn from "classnames";
// import styles from "./styles.scss";

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

  componentDidMount() {
    this.listenerId = eventRegister.addEventListener(EventNames.notification, (data: INotificationPopupData): void => {
      this.setState({...data, isOpen: true});
    });
  }

  componentWillUnmount() {
    eventRegister.removeEventListener(this.listenerId);
  }

  render() {
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
          <div>
            <button onClick={this.onClose}>{"ОК"}</button>
          </div>
      </Modal>
    );
  }

  private onClose = () => {
    this.setState({isOpen: false});
  };
}
