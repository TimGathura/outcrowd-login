defmodule OutcrowdLoginWeb.Components.Outcrowd do
  use OutcrowdLoginWeb, :html

  embed_templates "/outcrowd.html"

  def outcrowd_func(assigns) do
    ~H"""
    <.outcrowd />
    """
  end
end
