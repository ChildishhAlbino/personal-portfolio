const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_BASE_ENDPOINT,
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_PREVIEW_ENABLED,
} = process.env

export async function contentQuery<K, T>({
  query,
  variables,
}: contentQueryInput<T>): Promise<K> {
  console.log({
    timestamp: new Date(),
    CONTENTFUL_PREVIEW_ENABLED,
    foo: typeof CONTENTFUL_PREVIEW_ENABLED,
  })
  const isPreviewEnabled = !!CONTENTFUL_PREVIEW_ENABLED
  const res = await fetch(
    `${CONTENTFUL_BASE_ENDPOINT}content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CONTENTFUL_DELIVERY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: { ...variables, preview: isPreviewEnabled } || {
          preview: isPreviewEnabled,
        },
      }),
    }
  )
  const json = await res.json()
  if (!!json.errors) {
    throw Error(`Error with query... ${json.errors[0].message}`)
  }
  return json.data
}

interface contentQueryInput<Y> {
  query: string
  variables?: Y
}
