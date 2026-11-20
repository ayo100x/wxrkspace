import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CalendarDays,
  Check,
  Circle,
  Clock3,
  FileText,
  Plus,
  X,
} from "lucide-react";

type TeamspaceName = "Engineering" | "Design" | "Product";
type ProjectState = "In progress" | "Planning" | "In review";
type Project = {
  id: number;
  name: string;
  teamspace: TeamspaceName;
  state: ProjectState;
  progress: number;
  dueInDays: number;
  owner: string;
  contributors: string[];
  completedTasks: number;
  totalTasks: number;
};
type Task = {
  id: number;
  title: string;
  project: string;
  assignee: string;
  dueInDays: number | null;
};
type Activity = {
  id: number;
  person: string;
  initials: string;
  action: string;
  target: string;
  time: string;
};
type CreateDialog = "project" | "task" | null;

const initialProjects: Project[] = [
  {
    id: 1,
    name: "VERA",
    teamspace: "Product",
    state: "In progress",
    progress: 68,
    dueInDays: 12,
    owner: "Maya Chen",
    contributors: ["MC", "JL", "AK"],
    completedTasks: 17,
    totalTasks: 25,
  },
  {
    id: 2,
    name: "wxrkspace",
    teamspace: "Design",
    state: "In review",
    progress: 42,
    dueInDays: 24,
    owner: "Jonah Lee",
    contributors: ["JL", "SR", "MC"],
    completedTasks: 11,
    totalTasks: 26,
  },
  {
    id: 3,
    name: "Internal infrastructure",
    teamspace: "Engineering",
    state: "Planning",
    progress: 18,
    dueInDays: 38,
    owner: "Amir Khan",
    contributors: ["AK", "TW"],
    completedTasks: 4,
    totalTasks: 22,
  },
];

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Finalize onboarding flow",
    project: "VERA",
    assignee: "Maya Chen",
    dueInDays: -1,
  },
  {
    id: 2,
    title: "Review launch brief",
    project: "wxrkspace",
    assignee: "Jonah Lee",
    dueInDays: 1,
  },
  {
    id: 3,
    title: "API contract review",
    project: "Internal infrastructure",
    assignee: "Amir Khan",
    dueInDays: 3,
  },
];

const initialActivity: Activity[] = [
  {
    id: 1,
    person: "Maya Chen",
    initials: "MC",
    action: "completed a task in",
    target: "VERA",
    time: "12 min",
  },
  {
    id: 2,
    person: "Jonah Lee",
    initials: "JL",
    action: "updated the milestone for",
    target: "wxrkspace",
    time: "48 min",
  },
  {
    id: 3,
    person: "Sara Reed",
    initials: "SR",
    action: "added a decision note to",
    target: "Design system",
    time: "2 hr",
  },
];

const teamspaces: {
  name: TeamspaceName;
  summary: string;
  members: number;
  projects: number;
  className: string;
  initials: string;
}[] = [
  {
    name: "Engineering",
    summary: "Systems, delivery & reliability",
    members: 8,
    projects: 4,
    className: "engineering",
    initials: "ENG",
  },
  {
    name: "Design",
    summary: "Product experience & research",
    members: 5,
    projects: 3,
    className: "design",
    initials: "DSN",
  },
  {
    name: "Product",
    summary: "Strategy, discovery & launches",
    members: 6,
    projects: 5,
    className: "product",
    initials: "PRD",
  },
];

const greetingForHour = (hour: number) => {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const dateInDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);

const localDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const dueLabel = (days: number | null) => {
  if (days === null) return "No date";
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
};

const HomePage = () => {
  const [now, setNow] = useState(() => new Date());
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [activity, setActivity] = useState(initialActivity);
  const [dialog, setDialog] = useState<CreateDialog>(null);
  const [formError, setFormError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const element = dialogRef.current;
    if (dialog && element && !element.open) element.showModal();
    if (!dialog && element?.open) element.close();
  }, [dialog]);

  const openDialog = (type: Exclude<CreateDialog, null>) => {
    setFormError("");
    setDialog(type);
  };
  const closeDialog = () => {
    setFormError("");
    setDialog(null);
  };

  const addActivity = (newActivity: Omit<Activity, "id">) => {
    setActivity((current) => [
      { ...newActivity, id: Date.now() },
      ...current.slice(0, 2),
    ]);
  };

  const createProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("project-name") ?? "").trim();
    const teamspace = String(formData.get("teamspace") ?? "Product") as TeamspaceName;
    if (!name) {
      setFormError("Enter a project name to continue.");
      return;
    }

    setProjects((current) => [
      {
        id: Date.now(),
        name,
        teamspace,
        state: "Planning",
        progress: 0,
        dueInDays: 30,
        owner: "You",
        contributors: ["YO"],
        completedTasks: 0,
        totalTasks: 0,
      },
      ...current,
    ]);
    addActivity({
      person: "You",
      initials: "YO",
      action: "created a project in",
      target: teamspace,
      time: "now",
    });
    closeDialog();
  };

  const createTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("task-name") ?? "").trim();
    const project = String(formData.get("task-project") ?? "");
    const dueDateValue = String(formData.get("task-date") ?? "");
    if (!title) {
      setFormError("Enter a task name to continue.");
      return;
    }

    const dueInDays = dueDateValue
      ? Math.ceil(
          (new Date(`${dueDateValue}T00:00:00`).getTime() -
            new Date(new Date().toDateString()).getTime()) /
            86_400_000,
        )
      : null;
    setTasks((current) => [
      {
        id: Date.now(),
        title,
        project: project || "Workspace",
        assignee: "You",
        dueInDays,
      },
      ...current,
    ]);
    addActivity({
      person: "You",
      initials: "YO",
      action: "created a task in",
      target: project || "Workspace",
      time: "now",
    });
    closeDialog();
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.dueInDays === null) return 1;
    if (b.dueInDays === null) return -1;
    return a.dueInDays - b.dueInDays;
  });

  return (
    <div className="home-page min-h-full">
      <div className="home-content">
        <header className="home-header">
          <div>
            <p className="home-date">
              <CalendarDays aria-hidden="true" />
              {formatDate(now)}
            </p>
            <h1>{greetingForHour(now.getHours())}, welcome back.</h1>
            <p className="home-intro">
              Here’s what’s moving across <strong>XY Organisation</strong>.
            </p>
          </div>
          <div className="home-actions">
            <button
              type="button"
              className="home-button home-button-secondary"
              onClick={() => openDialog("task")}
            >
              <Check aria-hidden="true" />
              New task
            </button>
            <button
              type="button"
              className="home-button home-button-primary"
              onClick={() => openDialog("project")}
            >
              <Plus aria-hidden="true" />
              New project
            </button>
          </div>
        </header>

        <div className="home-layout">
          <div className="home-primary">
            <section className="home-section home-projects" aria-labelledby="projects-heading">
              <div className="home-section-heading">
                <div>
                  <p className="home-kicker">Initiatives in motion</p>
                  <h2 id="projects-heading">Active projects</h2>
                </div>
                <span className="home-count">{projects.length} initiatives</span>
              </div>
              <div className="project-list" role="list">
                <div className="project-columns" aria-hidden="true">
                  <span>Initiative</span>
                  <span>Owner</span>
                  <span>Progress</span>
                  <span>Target</span>
                </div>
                {projects.map((project) => (
                  <article className="project-row" key={project.id} role="listitem">
                    <div className="project-identity">
                      <span
                        className={`project-mark ${project.teamspace.toLowerCase()}`}
                        aria-hidden="true"
                      >
                        {project.name.slice(0, 1)}
                      </span>
                      <div className="project-name-wrap">
                        <h3>{project.name}</h3>
                        <span className="project-teamspace">{project.teamspace}</span>
                      </div>
                    </div>
                    <div className="project-owner">
                      <span className="avatar">{project.owner.split(" ").map((part) => part[0]).join("")}</span>
                      <span>{project.owner}</span>
                      {project.contributors.length > 1 && (
                        <span
                          className="project-collaborators"
                          aria-label={`${project.contributors.length - 1} other contributors`}
                        >
                          +{project.contributors.length - 1}
                        </span>
                      )}
                    </div>
                    <div className="project-progress">
                      <div className="progress-caption">
                        <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div
                        className="progress-track"
                        role="progressbar"
                        aria-label={`${project.name} progress`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={project.progress}
                      >
                        <span style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                    <div className="project-target">
                      <span className={`project-status ${project.state.toLowerCase().replace(" ", "-")}`}>
                        <Circle aria-hidden="true" />
                        {project.state}
                      </span>
                      <span className="target-date">{formatDate(dateInDays(project.dueInDays)).replace(/^\w+, /, "")}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-section home-teamspaces" aria-labelledby="teamspaces-heading">
              <div className="home-section-heading">
                <div>
                  <p className="home-kicker">Where work happens</p>
                  <h2 id="teamspaces-heading">Teamspaces</h2>
                </div>
                <span className="home-count">3 teams</span>
              </div>
              <div className="teamspace-list">
                {teamspaces.map((teamspace) => (
                  <article className="teamspace-row" key={teamspace.name}>
                    <span
                      className={`teamspace-icon ${teamspace.className}`}
                      aria-hidden="true"
                    >
                      {teamspace.initials}
                    </span>
                    <div className="teamspace-copy">
                      <h3>{teamspace.name}</h3>
                      <p>{teamspace.summary}</p>
                    </div>
                    <span className="teamspace-meta">{teamspace.members} people</span>
                    <span className="teamspace-meta teamspace-project-count">
                      {teamspace.projects} projects
                    </span>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="home-aside" aria-label="Workspace updates">
            <section className="home-section attention-section" aria-labelledby="attention-heading">
              <div className="home-section-heading">
                <div>
                  <p className="home-kicker">Keep things moving</p>
                  <h2 id="attention-heading">Coming up</h2>
                </div>
                <Clock3 aria-hidden="true" className="section-icon" />
              </div>
              <ul className="attention-list">
                {sortedTasks.slice(0, 4).map((task) => (
                  <li className="attention-row" key={task.id}>
                    <span
                      className={`attention-indicator ${task.dueInDays !== null && task.dueInDays < 0 ? "overdue" : ""}`}
                    />
                    <div className="attention-copy">
                      <h3>{task.title}</h3>
                      <p>{task.project} <span aria-hidden="true">·</span> {task.assignee}</p>
                    </div>
                    <span
                      className={`attention-date ${task.dueInDays !== null && task.dueInDays < 0 ? "overdue" : ""}`}
                    >
                      {dueLabel(task.dueInDays)}
                    </span>
                  </li>
                ))}
              </ul>
              {sortedTasks.length === 0 && (
                <p className="home-empty">You’re all caught up.</p>
              )}
            </section>

            <section className="home-section activity-section" aria-labelledby="activity-heading">
              <div className="home-section-heading">
                <div>
                  <p className="home-kicker">Across the workspace</p>
                  <h2 id="activity-heading">Recent activity</h2>
                </div>
                <FileText aria-hidden="true" className="section-icon" />
              </div>
              <ol className="activity-list">
                {activity.map((item) => (
                  <li className="activity-row" key={item.id}>
                    <span className={`avatar activity-avatar ${item.initials === "YO" ? "you" : ""}`}>
                      {item.initials}
                    </span>
                    <div className="activity-copy">
                      <p>
                        <strong>{item.person}</strong> {item.action}{" "}
                        <span className="activity-target">{item.target}</span>
                      </p>
                      <span className="activity-time">{item.time}{item.time === "now" ? "" : " ago"}</span>
                    </div>
                  </li>
                ))}
              </ol>
              {activity.length === 0 && (
                <p className="home-empty">Updates will appear here as work moves forward.</p>
              )}
            </section>
          </aside>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="home-dialog"
        aria-labelledby="dialog-heading"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => setDialog(null)}
      >
        {dialog && (
          <>
            <div className="dialog-heading">
              <div>
                <p className="home-kicker">
                  {dialog === "project" ? "Start something new" : "Capture the next step"}
                </p>
                <h2 id="dialog-heading">
                  {dialog === "project" ? "Create a project" : "Create a task"}
                </h2>
              </div>
              <button
                type="button"
                className="dialog-close"
                aria-label="Close dialog"
                onClick={closeDialog}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <form
              className="home-form"
              onSubmit={dialog === "project" ? createProject : createTask}
            >
              <label>
                <span>{dialog === "project" ? "Project name" : "Task name"}</span>
                <input
                  autoFocus
                  required
                  maxLength={100}
                  name={dialog === "project" ? "project-name" : "task-name"}
                  placeholder={dialog === "project" ? "e.g. Customer research" : "What needs to get done?"}
                  aria-describedby={formError ? "home-form-error" : undefined}
                  onChange={() => {
                    if (formError) setFormError("");
                  }}
                />
              </label>
              {dialog === "project" ? (
                <label>
                  <span>Teamspace</span>
                  <select name="teamspace" defaultValue="Product">
                    {teamspaces.map((teamspace) => (
                      <option key={teamspace.name} value={teamspace.name}>
                        {teamspace.name}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <>
                  <label>
                    <span>Project</span>
                    <select name="task-project" defaultValue="">
                      <option value="">No project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.name}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Due date <span className="field-optional">Optional</span></span>
                    <input
                      type="date"
                      name="task-date"
                      min={localDateString(new Date())}
                    />
                  </label>
                </>
              )}
              {formError && (
                <p className="home-form-error" id="home-form-error" role="alert">
                  {formError}
                </p>
              )}
              <div className="dialog-actions">
                <button type="button" className="home-button home-button-secondary" onClick={closeDialog}>
                  Cancel
                </button>
                <button type="submit" className="home-button home-button-primary">
                  <Plus aria-hidden="true" />
                  Create {dialog}
                </button>
              </div>
            </form>
          </>
        )}
      </dialog>
    </div>
  );
};

export default HomePage;
