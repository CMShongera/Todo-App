import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Todo } from "@/types/index"
import { Loader2 } from "lucide-react"
import { Textarea } from "./ui/textarea"

interface EditTodoModalProps {
    open: boolean
    todo: Todo | null
    loading?: boolean
    onOpenChange: (open: boolean) => void
    onEdit: (todo: Todo) => void
}

export function EditTodoModal({ open, onOpenChange, todo, onEdit, loading }: EditTodoModalProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // populate fields when modal opens or todo changes
    useEffect(() => {
        if (open && todo) {
            setTitle(todo.title)
            setDescription(todo.description)
        } else if (!open) {
            setTitle("")
            setDescription("")
        }
    }, [open, todo])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (todo && title.trim()) {
            onEdit({
                ...todo,
                title: title.trim(),
                description: description.trim(),
            })
        }
    }

    if (!todo) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md space-y-4">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    <Textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!title.trim() || !description.trim() || loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Edit Task"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
