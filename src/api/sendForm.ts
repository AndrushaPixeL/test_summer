import { TForm } from '../components/Form/Form'

export const sendForm = (formState: TForm) => {
  return fetch('https://webhook.site/92299410-e3d0-48c3-b288-a471594e869d', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: '*',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(formState),
  })
}
