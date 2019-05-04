from django.core.management.base import BaseCommand, CommandError
from practices.models import DailySummary, Practice, Entity, Provider
from django.db.utils import IntegrityError
import csv
import os



class Command(BaseCommand):
	help = "create Provider objects from csv file data.  The file must have column headers of Provider first name, last name, credentials, entity"

	def add_arguments(self, parser):
		parser.add_argument('data_file', type=str)

	def handle(self, *args, **options):
		file = options['data_file']
		total_created = 0
		total_skipped = 0
		duplicate_dates = []
		skipped_lines = []
		integrity_error = False
		print('')

		with open(file, newline='',	encoding='utf-8-sig') as csvfile:
			reader = csv.reader(csvfile)

			for linenum, line in enumerate(reader):
				if linenum != 0:
					if line[0] != "":
						try:
							entity=Entity.objects.get(name=line[0].strip())
							practice=Practice.objects.get(name=line[1].strip())
							provider = Provider.objects.create(
								first_name = line[2].strip(), 
								last_name=line[3].strip(), 
								credentials=line[4].strip(),
								entity=entity)
							practice.providers.add(provider)
						except Exception as e:
							total_skipped += 1
							skipped_lines.append(line[0])
							print(e)
						else: 
							total_created+= 1
					else:
						total_skipped += 1
		print('{} File lines were skipped'.format(total_skipped))
		print('{} Providers were created'.format(total_created))