import React, {useEffect} from "react";
import {useForm} from "../../common/useForm";

export const UseFormComponent = (): JSX.Element => {
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
    </div>
  );
};
