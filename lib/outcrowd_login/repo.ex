defmodule OutcrowdLogin.Repo do
  use Ecto.Repo,
    otp_app: :outcrowd_login,
    adapter: Ecto.Adapters.Postgres
end
