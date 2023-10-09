import { useCurrentQuery } from "../../app/services/user"
import { Loader } from "../../components/loader"

export const Auth = ({ children }: { children: JSX.Element }) => {
	const { isLoading } = useCurrentQuery()

	if (isLoading) {
		return (<Loader />)
	}

	return children
}
