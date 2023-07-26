import { json } from '@remix-run/node'
import {
	useLoaderData,
	Meta,
	Links,
	Outlet,
	ScrollRestoration,
	Scripts,
	LiveReload,
} from '@remix-run/react'
import { useEventSource } from 'remix-utils'

export function loader() {
	return json({
		initialCount: new Date().toLocaleTimeString('en', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}),
	})
}
export default function App() {
	const { initialCount } = useLoaderData<typeof loader>()
	const count = useEventSource('/sse/counter') ?? initialCount
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<h1>
					The server time is <time>{count}</time>
				</h1>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
