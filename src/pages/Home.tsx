import { useEffect, useState } from "react"
import ConfettiExplosion from "react-confetti-boom"
import { Button } from "@/components/ui/button"
import { AddTodoModal } from "@/components/AddTodoForm"
import { Plus } from "lucide-react"
import { ModeToggle } from "@/components/ModeToggle"
import { toast } from "sonner"
import { EditTodoModal } from "@/components/EditTodoForm"
import type { Todo } from "@/types"
import TodoList from "@/components/TodoList"
import { createTodo, fetchTodos, toggleTodoCompletion, updateTodo } from "@/api/todoApi"

function Home() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)

    const [addTodoLoading, setAddTodoLoading] = useState(false)
    const [editTodoLoading, setEditTodoLoading] = useState(false)

    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
    const [showConfetti, setShowConfetti] = useState(false)

    const completedCount = todos.filter((todo) => todo.completed).length
    const totalCount = todos.length

    const simulateNetworkDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // ⬇ central refetch function
    const loadTodos = async () => {
        try {
            setLoading(true)
            const fetchedTodos = await fetchTodos()
            setTodos([...fetchedTodos])
        } catch {
            toast.error("Failed to load todos.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        simulateNetworkDelay(2000).then(loadTodos)
    }, [])

    const addTodo = async (title: string, description: string) => {
        try {
            setAddTodoLoading(true)
            await simulateNetworkDelay(2000)
            await createTodo(title, description)
            toast.success("Todo created successfully.")
            loadTodos() // refresh
        } catch {
            toast.error("Failed to create todo.")
        } finally {
            setAddTodoLoading(false)
            setModalOpen(false)
        }
    }

    const toggleTodo = async (id: string, completed: boolean) => {
        try {
            await toggleTodoCompletion(id)
            if (completed === false) {
                toast.success("Todo marked as complete.")
                setShowConfetti(true)
                setTimeout(() => setShowConfetti(false), 3000)
            } else {
                toast.info("Todo marked as incomplete.")
            }
            loadTodos() // refresh
        } catch {
            toast.error("Failed to toggle todo.")
        }
    }

    const handleEditClick = (todo: Todo) => {
        setSelectedTodo(todo)
        setEditModalOpen(true)
    }

    const editTodo = async (
        todo: Todo
    ) => {
        try {
            setEditTodoLoading(true)
            await simulateNetworkDelay(2000)
            await updateTodo(todo.id, todo.title, todo.description, todo.completed, todo.createdAt)
            toast.success("Todo updated successfully.")
            loadTodos() // refresh
        } catch {
            toast.error("Failed to update todo.")
        } finally {
            setEditTodoLoading(false)
            setEditModalOpen(false)
            setSelectedTodo(null)
        }
    }

    return (
        <>
            {/* Confetti overlay */}
            {showConfetti && (
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <ConfettiExplosion />
                </div>
            )}

            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-primary">
                        To-do
                    </h1>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ModeToggle />
                    </Button>
                </div>

                {/* Progress Card */}
                <div className="bg-card rounded-2xl p-4 mb-8 border border-border">
                    <div className="flex items-center justify-between">
                        <div className="w-fit flex-3">
                            <h2 className="text-2xl font-bold text-foreground mb-2">Task Progress</h2>
                            <p className="text-sm text-muted-foreground max-w-xs sm:max-w-sm md:max-w-md leading-relaxed">
                                Keep track of your tasks from anywhere, at anytime.
                            </p>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <span className="size-16 md:size-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-primary">
                                {completedCount}/{totalCount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Add Todo Button */}
                <div className="flex gap-3 mb-6 items-center justify-between">
                    <span className="text-xl font-semibold">Here are your tasks.</span>
                    <Button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className=" bg-primary hover:bg-primary/90"
                    >
                        <Plus className="h-5 w-5" /> <span>Add To-do</span>
                    </Button>
                </div>

                {/* Todo List */}
                <TodoList
                    loading={loading}
                    todos={todos}
                    handleAddClick={() => setModalOpen(true)}
                    toggleTodo={toggleTodo}
                    handleEditClick={handleEditClick}
                    refetchTodos={loadTodos}
                />

                {/* Add Todo Modal */}
                <AddTodoModal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    onAdd={addTodo}
                    loading={addTodoLoading}
                />

                {/* Edit Todo Modal */}
                <EditTodoModal
                    open={editModalOpen}
                    onOpenChange={setEditModalOpen}
                    todo={selectedTodo}
                    onEdit={editTodo}
                    loading={editTodoLoading}
                />
            </div>
        </>
    )
}

export default Home
