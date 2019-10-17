import React, {useEffect} from "react";
import {useForm} from "../../common/useForm";
import {useDispatch, useSelector} from "react-redux";
import {IAppState} from "../../store/IAppState";
import {IUsers} from "../../api/dto/Users.g";
import {UsersThunk} from "../users/usersThunk";
import "./styles.scss";

interface IUseFormMapStateToProps {
  users: IUsers[];
}

const UseFormComponent = () => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touchedValues,
    handleSubmit,
  } = useForm({
    initialValues: {
      name: "",
      name1: "",
    },
    onSubmit: (submitValues, e): void => {
      alert(JSON.stringify({values: submitValues, errors: e}, null, 2));
    },
    validate: (validateValues): Partial<typeof validateValues> => {
      const validateErrors: Partial<typeof validateValues> = {};
      if (validateValues.name == "") {
        validateErrors.name = "Введите имя";
      }

      if (validateValues.name1 == "") {
        validateErrors.name1 = "Введите имя";
      }

      return validateErrors;
    },
  });

  useEffect(() => {
    console.log("Перерендер");
  }, [values.name1]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UsersThunk.getUsers());
  }, []);

  const props = useSelector(((state: IAppState): IUseFormMapStateToProps => ({
    users: state.usersPage.users.items,
  })));

  return (
    <div>
      {console.log(errors)}
      {console.log(touchedValues)}
      <form onSubmit={handleSubmit}>
        <h4>
          Add Guest
          <hr />
        </h4>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touchedValues.name && <div>{errors.name}</div>}
        </div>
        <div>
          <label htmlFor="name">Full Name1</label>
          <input
            type="text"
            name="name1"
            value={values.name1}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name1 && touchedValues.name1 && <div>{errors.name1}</div>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <br />
        <h5>Users:</h5>
        {
          (props.users || []).map((item: IUsers) => {
            return (<div key={item.id}>{item.name}</div>);
          })
        }
      </div>
    </div>
  );
};

//tslint:disable-next-line
export default UseFormComponent;
