defmodule OutcrowdLoginWeb.OutcrowdLive do
  use OutcrowdLoginWeb, :main_layout

  import OutcrowdLoginWeb.Components.Outcrowd

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <.outcrowd />
    """
  end
end
