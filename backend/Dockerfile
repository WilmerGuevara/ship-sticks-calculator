FROM ruby:2.6
RUN apt-get update -qq
RUN mkdir /ship_sticks
WORKDIR /ship_sticks
COPY Gemfile /ship_sticks/Gemfile
COPY Gemfile.lock /ship_sticks/Gemfile.lock
RUN bundle install
COPY . /ship_sticks

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
