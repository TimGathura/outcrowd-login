defmodule OutcrowdLogin.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      OutcrowdLoginWeb.Telemetry,
      OutcrowdLogin.Repo,
      {DNSCluster, query: Application.get_env(:outcrowd_login, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: OutcrowdLogin.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: OutcrowdLogin.Finch},
      # Start a worker by calling: OutcrowdLogin.Worker.start_link(arg)
      # {OutcrowdLogin.Worker, arg},
      # Start to serve requests, typically the last entry
      OutcrowdLoginWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: OutcrowdLogin.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    OutcrowdLoginWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
