export default function Home() {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-16 text-base-content">
      <div className="mx-auto max-w-5xl">
        <div className="hero rounded-3xl bg-base-100 shadow-xl">
          <div className="hero-content flex-col gap-8 py-16 text-center lg:flex-row lg:text-left">
            <div className="max-w-xl">
              <span className="badge badge-primary badge-outline mb-4">DaisyUI ready</span>
              <h1 className="text-5xl font-bold leading-tight">Build a beautiful app with Next.js and DaisyUI.</h1>
              <p className="mt-6 text-lg text-base-content/70">
                This starter is already configured with Tailwind CSS v4 and DaisyUI, so you can start creating polished interfaces immediately.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="btn btn-primary">Get Started</button>
                <button className="btn btn-outline btn-secondary">Learn More</button>
              </div>
            </div>

            <div className="card w-full max-w-md bg-primary text-primary-content shadow-2xl">
              <div className="card-body">
                <h2 className="card-title text-2xl">Quick stats</h2>
                <div className="stats stats-vertical shadow">
                  <div className="stat">
                    <div className="stat-title text-primary-content/80">Projects</div>
                    <div className="stat-value text-3xl">24</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-primary-content/80">Growth</div>
                    <div className="stat-value text-3xl">+48%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
