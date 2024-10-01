const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false,
			token: null
		},
		actions: {
			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/login", {
						method: "POST",
						body: JSON.stringify({ email: email, password: password }),
						headers: {
							"Content-Type": "application/json"
						}
					})
					if (!resp.ok) throw Error("There was a problem in the login request")

					if (resp.status === 401) {
						throw ("Invalid credentials")
					}
					else if (resp.status === 400) {
						throw ("Invalid email or password format")
					}
					const data = await resp.json()
					console.log(data);
					setStore({ auth: true })
					localStorage.setItem("jwt-token", data.token);
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			setToken: () => {
				setStore({ token: localStorage.getItem("jwt-token") })
			},

			logout: () => {
				localStorage.removeItem('jwt_token');
				setStore({
					token: null,
					auth: false,
			
				});
				console.log("Usuario desconectado");
			},

			register: async(email,password) =>{
				try {
					const resp = await fetch(process.env.BACKEND_URL+ "api/register", {
						method: "POST",
						body: JSON.stringify({ email: email, password:password }),
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await resp.json()
					return data;

				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
