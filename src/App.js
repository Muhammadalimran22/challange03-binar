import React, { Component, useState } from "react";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Stack,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const initialTasks = [
  {
    id: 1,
    task: "Nyuci mobil",
    complete: true,
  },
  {
    id: 2,
    task: "Memberi makan kucing",
    complete: true,
  },
  {
    id: 3,
    task: "Olahraga 10 menit",
    complete: false,
  },
  {
    id: 4,
    task: "Sarapan sereal",
    complete: true,
  },
  {
    id: 5,
    task: "Belanja harian",
    complete: false,
  },
  {
    id: 6,
    task: "Ngeprint tugas",
    complete: true,
  },
  {
    id: 7,
    task: "Bayar tagihan bulanan",
    complete: true,
  },
  {
    id: 8,
    task: "Berangkat kuliah",
    complete: false,
  },
  {
    id: 9,
    task: "Les bahasa Inggris",
    complete: true,
  },
  {
    id: 10,
    task: "Ke rumah Sabrina",
    complete: false,
  },
];

const TodoList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");
  const [inputTask, setInputTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTaskModalShow, setDeleteTaskModalShow] = useState(false);
  const [deleteAllTaskModalShow, setDeleteAllTaskModalShow] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const handleFilter = (status) => {
    setFilter(status);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          complete: !task.complete,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      task: inputTask,
      complete: false,
    };
    setTasks([...tasks, newTask]);
    setInputTask("");
  };

  const handleDeleteTask = (id) => {
    setDeleteTaskModalShow(true);
    setDeleteTaskId(id);
  };

  const handleEditTask = (id, task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          task: task,
        };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTaskConfirmation = () => {
    const updatedTasks = tasks.filter((task) => task.id !== deleteTaskId);
    setTasks(updatedTasks);
    setDeleteTaskModalShow(false);
    setDeleteTaskId(null);
  };

  const handleDeleteAllTasksConfirmation = () => {
    setDeleteAllTaskModalShow(false);
    setTasks([]);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "all") return true;
      if (filter === "done") return task.complete;
      if (filter === "todo") return !task.complete;
    })
    .filter((task) =>
      task.task.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <Container>
              <Card>
                <Card.Body>
                  <h3 className="text-center">TODO SEARCH</h3>
                  <Row>
                    <Col sm={8}>
                      <input
                        className="w-100 mt-4 m-1"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Container>
                    <Row className="gap-4">
                      <Col sm={8} className="p-1">
                        <Button
                          className=" mt-2 rounded-2 w-100"
                          variant="primary"
                          size="md"
                          onClick={() => alert("Search clicked!")}
                        >
                          Search
                        </Button>
                      </Col>
                      <Col className="p-1">
                        <Button
                          className="mt-2 rounded-2 w-100"
                          variant="primary"
                          size="md"
                          onClick={handleAddTask}
                        >
                          Add New Task
                        </Button>
                      </Col>
                      <Col className="p-1">
                        <Button
                          className="mt-2 rounded-2 w-100"
                          variant="danger"
                          size="md"
                          onClick={() => setDeleteAllTaskModalShow(true)}
                        >
                          Delete All Tasks
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Container>

            <Container>
              <h3 className="text-center mt-5">TODO LIST</h3>
              <Row className="text-center gap-3 mt-4 ">
                <Col>
                  <Button
                    variant="primary"
                    className="text-white w-100 mt-2"
                    onClick={() => handleFilter("all")}
                  >
                    All
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    className="text-white w-100 mt-2"
                    onClick={() => handleFilter("done")}
                  >
                    Done
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    className="text-white w-100 mt-2"
                    onClick={() => handleFilter("todo")}
                  >
                    To-do
                  </Button>
                </Col>
              </Row>
            </Container>

            <Container>
              <Row>
                <Col className="mt-3">
                  <Stack gap={3}>
                    {filteredTasks.map((task) => (
                      <div
                        style={{ border: "1px solid black", padding: "5px" }}
                        className="task"
                        key={task.id}
                      >
                        <div className="d-flex align-items-center">
                          <label>
                            <span
                              style={{
                                textDecoration: task.complete
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {task.task}
                            </span>
                          </label>
                          <div className="task-buttons ms-auto">
                            <input
                              type="checkbox"
                              style={{ marginRight: "10px" }}
                              checked={task.complete}
                              onChange={() => handleToggleComplete(task.id)}
                            />{" "}
                            <Button
                              onClick={() => {
                                const newTask = prompt("Edit task:", task.task);
                                if (newTask) handleEditTask(task.id, newTask);
                              }}
                              variant=""
                              className="me-2"
                            >
                              <i className="fas fa-pen text-warning"></i>{" "}
                            </Button>
                            <Button
                              onClick={() => handleDeleteTask(task.id)}
                              variant=""
                            >
                              <i className="fas fa-trash text-danger"></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Stack>
                </Col>
              </Row>
            </Container>

            {/* Delete Task Modal */}
            <Modal
              show={deleteTaskModalShow}
              onHide={() => setDeleteTaskModalShow(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this task?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setDeleteTaskModalShow(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteTaskConfirmation}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delete All Tasks Modal */}
            <Modal
              show={deleteAllTaskModalShow}
              onHide={() => setDeleteAllTaskModalShow(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete All Tasks</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete all tasks?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setDeleteAllTaskModalShow(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteAllTasksConfirmation}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            <Container className="mt-5">
              <h3 className=""></h3>
              <Card>
                <Card.Body>
                  <h3 className="text-center">TODO SEARCH</h3>
                  <Row>
                    <Col>
                      <input
                        className="w-100"
                        type="text"
                        value={inputTask}
                        onChange={(e) => setInputTask(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-3">
                      <Button className="w-100" onClick={handleAddTask}>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default TodoList;
