import React from "react";
//import { LoginPage } from './pages/auth/customLoginPage'
import { Refine, AuthProvider } from "@pankod/refine-core";
import { authProvider } from "./authProvider";

import {
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
    ReadyPage,
    ErrorComponent, AuthPage
} from "@pankod/refine-mui";
import {
    AccountCircleOutlined,
    ChatBubbleOutline,
    PeopleAltOutlined,
    StarOutlineRounded,
    VillaOutlined,
} from "@mui/icons-material";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { Title, Sider, Layout, Header } from "components/layout";
import { ColorModeContextProvider } from "contexts";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

import {
    Login,
    Home,
    Products,
    Agents,
    MyProfile,
    PropertyDetails,
    AllProperties,
    CreateProperty,
    AgentProfile,
    EditProperty,
    Storehome ,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (request.headers) {
        request.headers["Authorization"] = `Bearer ${token}`;
    } else {
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});

function App() {
    // const authProvider: AuthProvider = {
    //     login: async ({ credential }: CredentialResponse) => {
    //         const profileObj = credential ? parseJwt(credential) : null;

    //         if (profileObj) {
    //             const response = await fetch(
    //                 "http://localhost:9000/login",
    //                 {
    //                     method: "POST",
    //                     headers: { "Content-Type": "application/json" },
    //                     body: JSON.stringify({
    //                         email:"abc@gmail.com",
    //                         password: "1234",
    //                         // name: profileObj.name,
    //                         // email: profileObj.email,
    //                         // avatar: profileObj.picture,
    //                     }),
    //                 },
    //             );

    //             const data = await response.json();

    //             if (response.status === 200) {
    //                 localStorage.setItem(
    //                     "user",
    //                     JSON.stringify({
    //                         ...profileObj,
    //                         avatar: profileObj.picture,
    //                         userid: data._id,
    //                     }),
    //                 );
    //             } else {
    //                 return Promise.reject();
    //             }
    //         }
    //         localStorage.setItem("token", `${credential}`);

    //         return Promise.resolve();
    //     },
    //     logout: () => {
    //         const token = localStorage.getItem("token");

    //         if (token && typeof window !== "undefined") {
    //             localStorage.removeItem("token");
    //             localStorage.removeItem("user");
    //             axios.defaults.headers.common = {};
    //             window.google?.accounts.id.revoke(token, () => {
    //                 return Promise.resolve();
    //             });
    //         }

    //         return Promise.resolve();
    //     },
    //     checkError: () => Promise.resolve(),
    //     checkAuth: async () => {
    //         const token = localStorage.getItem("token");

    //         if (token) {
    //             return Promise.resolve();
    //         }
    //         return Promise.reject();
    //     },

    //     getPermissions: () => Promise.resolve(),
    //     getUserIdentity: async () => {
    //         const user = localStorage.getItem("user");
    //         if (user) {
    //             return Promise.resolve(JSON.parse(user));
    //         }
    //     },
    // };
        let role ='editor'
    return (
        <ColorModeContextProvider>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>

                <Refine
                    dataProvider={dataProvider("http://localhost:9000")}
                    accessControlProvider={{
                        can: async ({ resource, action, params }) => {
                            if (resource === "dashboard" && action === "list" && role !== 'admin') {
                                return Promise.resolve({
                                    can: false,
                                    reason: "Unauthorized",
                                });
                            }

                            // or you can access directly *resource object
                            // const resourceName = params?.resource?.name;
                            // const anyUsefulOption = params?.resource?.options?.yourUsefulOption;
                            // if (resourceName === "posts" && anyUsefulOption === true && action === "edit") {
                            //     return Promise.resolve({
                            //         can: false,
                            //         reason: "Unauthorized",
                            //     });
                            // }

                            return Promise.resolve({ can: true });
                        },
                    }}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: 'dashboard',
                            icon: <VillaOutlined />,
                            options: { label: "Admin-Space" },

                        }, {
                            name: 'store',
                            //parentName : 'dashboard',
                            icon: <VillaOutlined />,
                            options: { label: "Store" },
                        },
                        {
                            name: "properties",
                            parentName: 'dashboard',
                            //list: AllProperties,
                            options: { label: "Categories" },
                            // show: PropertyDetails,
                            // create: CreateProperty,
                            // edit: EditProperty,
                            icon: <VillaOutlined />,
                        },
                        {
                            name: "agents",
                            parentName: 'dashboard',
                            //list: Agents,
                            //show: AgentProfile,
                            icon: <PeopleAltOutlined />,
                        },
                        {
                            name: "reviews",
                            parentName: 'dashboard',
                            list: Home,
                            icon: <StarOutlineRounded />,
                        },
                        {
                            name: "messages",
                            parentName: 'dashboard',
                            list: Home,
                            icon: <ChatBubbleOutline />,
                        },
                        {
                            name: "my-profile",
                            parentName: 'dashboard',
                            options: { label: "My Profile " },
                            //list: MyProfile,
                            icon: <AccountCircleOutlined />,
                        },
                        {
                            name: "Home",
                            parentName: 'store',
                            options: { label: "Home" },
                            list: Storehome
                        },
                        {
                            name: "Categories",
                            parentName: 'store',
                        },
                        {name : 'prdt/Jeans' , options: { label: "Jeans" }, parentName: 'Categories'  , list :Products},
                        {name : 'prdt/Jackets' , options: { label: "Jackets" }, parentName: 'Categories'  , list :Products},
                        {name : 'prdt/Shoes' , options: { label: "Shoes" }, parentName: 'Categories'  , list :Products},
                        {name : 'prdt/Tshirts' , options: { label: "Tshirts" }, parentName: 'Categories'  , list :Products},
                        {
                            name: "Orders",
                            parentName: 'store',
                            list: Home
                        }, {
                            name: "Cart",
                            parentName: 'store',
                            list: Home,
                            options: { label: "Cart" },
                        }

                    ]}
                    Title={Title}
                    Sider={Sider}
                    Layout={Layout}
                    Header={Header}
                    routerProvider={routerProvider}
                    // authProvider={authProvider}
                    // LoginPage={LoginPage}
                    // DashboardPage={Home}
                />
            </RefineSnackbarProvider>
        </ColorModeContextProvider>
    );
}

export default App;
