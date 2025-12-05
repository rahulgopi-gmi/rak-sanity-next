import React from "react"
import { PatchEvent, set } from "sanity"
import { Stack, Button, Card, Text } from "@sanity/ui"

interface CustomArrayInputProps {
    type: any
    value?: any[]
    onChange: (event: PatchEvent) => void
    path: (string | number)[]
    level: number
}

export default function CustomSingleItemArray({
    type,
    value,
    onChange,
    path,
    level
}: CustomArrayInputProps) {
    const hasItem = value && value.length > 0

    const addItem = () => {
        const newItem = { _type: type.of[0].name } // only one type allowed
        onChange(PatchEvent.from(set([newItem])))
    }

    return (
        <Stack space={3}>
            {value?.map((item, index) => (
                <Card key={index} padding={2} radius={2} shadow={1} tone="default">
                    <Text>{item._type}</Text>
                </Card>
            ))}

            {!hasItem && <Button text="Add Item" onClick={addItem} />}
        </Stack>
    )
}
