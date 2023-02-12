import { useLogin } from "@pankod/refine-core";
import { Form } from "@pankod/refine-antd";

type LoginVariables = {
    username: string;
    password: string;
};

export  const  LoginPage = () => {
    const { mutate: login } = useLogin<LoginVariables>();

    const onSubmit = (values: LoginVariables) => {
        login(values);
    };

    return <Form onFinish={onSubmit}>// rest of the login form</Form>;
};