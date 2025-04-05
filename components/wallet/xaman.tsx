import { Xumm } from "xumm";
import React from "react";
import { useState } from "react";

const xumm = new Xumm('4d761c19-6260-4690-9220-2eddcf3ad585', '1dc61254-4d39-40ec-91b0-317a2c90ccbf')

function Xaman() {
	const [account, setAccount] = useState('')
	const [payloadUuid, setPayloadUuid] = useState('')
	const [lastPayloadUpdate, setLastPayloadUpdate] = useState('')
	const [openPayloadUrl, setOpenPayloadUrl] = useState('')
	const [appName, setAppName] = useState('')

	xumm.user.account.then(a => setAccount(a ?? ''))
	xumm.environment.jwt?.then(j => setAppName(j?.app_name ?? ''))

	const logout = () => {
		xumm.logout()
		setAccount('')
	}
	const createPayload = async () => {
		const payload = await xumm.payload?.createAndSubscribe({
			TransactionType: 'Payment',
			Destination: 'rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ',
			Account: account,
			Amount: String(1337),
		}, event => {
			// Return if signed or not signed (rejected)
			setLastPayloadUpdate(JSON.stringify(event.data, null, 2))

			// Only return (websocket will live till non void)
			if (Object.keys(event.data).indexOf('signed') > -1) {
				return true
			}
		})

		if (payload) {
			setPayloadUuid(payload.created.uuid)

			if (xumm.runtime.xapp) {
				xumm.xapp?.openSignRequest(payload.created)
			} else {
				if (payload.created.pushed && payload.created.next?.no_push_msg_received) {
					setOpenPayloadUrl(payload.created.next.no_push_msg_received)
				} else {
					window.open(payload.created.next.always)
				}
			}
		}

		return payload
	}

	return (
		<div className="App">
			<h2>{appName}</h2>
			<div>
				Hi <b>{account}</b>
			</div>
			{
				account === '' && !xumm.runtime.xapp
					? <button onClick={xumm.authorize}>Sign in</button>
					: ''
			}
			{
				account !== ''
					? <>
						<button onClick={createPayload}>Make a payment</button>
						&nbsp;- or -&nbsp;
						<button onClick={logout}>Sign Out</button>
					</>
					: ''
			}
			<br />
			<br />
			<code>{payloadUuid}</code>
			{
				payloadUuid
					? openPayloadUrl !== ''
						? <b><br /><a href={openPayloadUrl} target="_blank">Payload Pushed, no push received? Open Payload...</a></b>
						: 'Payload pushed'
					: ''
			}
			<pre>{lastPayloadUpdate}</pre>
		</div>
	)
}

export default Xaman;